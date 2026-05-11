from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import secrets
import shutil
import os

import models, schemas, utils
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Acapra API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    # Evita sobreposicao se nomes iguais usando um hash rapido ou timestamp
    import time
    safe_name = f"{int(time.time())}_{file.filename}"
    file_location = f"uploads/{safe_name}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)
    return {"url": f"http://localhost:8000/uploads/{safe_name}"}

# ---- ROTAS DE AUTENTICAÇÃO E ADMINISTRAÇÃO ---- #

@app.post("/api/auth/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == req.username).first()
    if not user or not utils.verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    fake_token = secrets.token_hex(16)
    return {"token": fake_token, "username": user.username, "userId": user.id, "is_admin": user.is_admin}

@app.post("/api/auth/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter((models.User.username == user.username) | (models.User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Usuário já cadastrado")
    
    hashed_pwd = utils.get_password_hash(user.password)
    # Default as normal user, is_admin is optionally passed
    admin_val = user.is_admin if hasattr(user, 'is_admin') and user.is_admin is not None else 0
    new_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pwd, is_admin=admin_val)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/api/users/{id}", response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user: raise HTTPException(status_code=404, detail="Não encontrado")
    return user

@app.put("/api/users/{id}", response_model=schemas.UserResponse)
def update_user(id: int, u: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if u.full_name: user.full_name = u.full_name
    if u.age: user.age = u.age
    if u.location: user.location = u.location
    if u.avatar_url: user.avatar_url = u.avatar_url
    db.commit(); db.refresh(user)
    return user

@app.put("/api/auth/password")
def change_password(req: schemas.PasswordUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == req.username).first()
    if not user or not utils.verify_password(req.old_password, user.hashed_password):
         raise HTTPException(status_code=401, detail="Senha atual incorreta")
    
    user.hashed_password = utils.get_password_hash(req.new_password)
    db.commit()
    return {"message": "Senha atualizada com sucesso"}

# ---- ROTAS DE ANIMAIS (PETS) ---- #

@app.get("/api/pets", response_model=List[schemas.Pet])
def read_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = db.query(models.Pet).offset(skip).limit(limit).all()
    for pet in pets:
        if pet.temperament and isinstance(pet.temperament, str):
            pet.temperament = [t.strip() for t in pet.temperament.split(',') if t.strip()]
        else:
            pet.temperament = []
    return pets

@app.post("/api/pets", response_model=schemas.Pet)
def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    db_pet = models.Pet(
        name=pet.name, species=pet.species, breed=pet.breed,
        age=pet.age, size=pet.size, gender=pet.gender, image=pet.image,
        description=pet.description, health=pet.health,
        temperament=",".join(pet.temperament)
    )
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    if db_pet.temperament and isinstance(db_pet.temperament, str):
        db_pet.temperament = [t.strip() for t in db_pet.temperament.split(',') if t.strip()]
    return db_pet

@app.put("/api/pets/{id}", response_model=schemas.Pet)
def update_pet(id: int, pet: schemas.PetCreate, db: Session = Depends(get_db)):
    db_pet = db.query(models.Pet).filter(models.Pet.id == id).first()
    if not db_pet: raise HTTPException(status_code=404)
    for key, value in pet.model_dump().items():
        if key == "temperament": value = ",".join(value)
        setattr(db_pet, key, value)
    db.commit(); db.refresh(db_pet)
    if db_pet.temperament: db_pet.temperament = [t.strip() for t in db_pet.temperament.split(',') if t.strip()]
    return db_pet

@app.delete("/api/pets/{pet_id}")
def delete_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = db.query(models.Pet).filter(models.Pet.id == pet_id).first()
    if not db_pet:
        raise HTTPException(status_code=404, detail="Animal não foi encontrado")
    db.delete(db_pet)
    db.commit()
    return {"message": "Animal removido com sucesso"}

# ---- ROTAS DE DENÚNCIAS E DESAPARECIDOS ---- #

@app.get("/api/reports", response_model=List[schemas.Report])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Report).order_by(models.Report.created_at.desc()).offset(skip).limit(limit).all()

@app.post("/api/reports", response_model=schemas.Report)
def create_report(report: schemas.ReportCreate, db: Session = Depends(get_db)):
    # report.dict() replaced by report.model_dump() on pydantic 2, but fallback to dict if older
    data = report.dict() if hasattr(report, "dict") else report.model_dump()
    db_report = models.Report(**data)
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

@app.delete("/api/reports/{report_id}")
def delete_report(report_id: int, db: Session = Depends(get_db)):
    db_report = db.query(models.Report).filter(models.Report.id == report_id).first()
    if not db_report:
        raise HTTPException(status_code=404, detail="Denúncia não encontrada")
    db.delete(db_report)
    db.commit()
    return {"message": "Deletada com sucesso"}

# ---- ROTAS DE CONFIGURAÇÕES (PIX) ---- #

@app.get("/api/config/{key_name}")
def read_config(key_name: str, db: Session = Depends(get_db)):
    config = db.query(models.ConfigSetting).filter(models.ConfigSetting.key_name == key_name).first()
    if not config:
        raise HTTPException(status_code=404, detail="Config não encontrada")
    return {"value": config.value}

@app.put("/api/config/{key_name}")
def update_config(key_name: str, config_req: schemas.ConfigSettingCreate, db: Session = Depends(get_db)):
    config = db.query(models.ConfigSetting).filter(models.ConfigSetting.key_name == key_name).first()
    if not config:
        new_conf = models.ConfigSetting(key_name=key_name, value=config_req.value)
        db.add(new_conf)
    else:
        config.value = config_req.value
    db.commit()
    return {"message": "Configuração atualizada"}

# ---- ROTAS DE FINAIS FELIZES ---- #

@app.get("/api/happytails", response_model=List[schemas.HappyTail])
def read_happytails(db: Session = Depends(get_db)):
    return db.query(models.HappyTail).order_by(models.HappyTail.created_at.desc()).all()

@app.post("/api/happytails", response_model=schemas.HappyTail)
def create_happytail(tail: schemas.HappyTailCreate, db: Session = Depends(get_db)):
    data = tail.dict() if hasattr(tail, "dict") else tail.model_dump()
    db_tail = models.HappyTail(**data)
    db.add(db_tail)
    db.commit()
    db.refresh(db_tail)
    return db_tail

@app.put("/api/happytails/{id}", response_model=schemas.HappyTail)
def update_tail(id: int, tail: schemas.HappyTailCreate, db: Session = Depends(get_db)):
    db_tail = db.query(models.HappyTail).filter(models.HappyTail.id == id).first()
    if not db_tail: raise HTTPException(status_code=404)
    data = tail.dict() if hasattr(tail, "dict") else tail.model_dump()
    for key, value in data.items(): setattr(db_tail, key, value)
    db.commit(); db.refresh(db_tail)
    return db_tail

@app.delete("/api/happytails/{id}")
def delete_happytail(id: int, db: Session = Depends(get_db)):
    db_tail = db.query(models.HappyTail).filter(models.HappyTail.id == id).first()
    db.delete(db_tail)
    db.commit()
    return {"message": "Excluído com sucesso"}

# ---- ROTAS DE NOTÍCIAS ---- #

@app.get("/api/news", response_model=List[schemas.News])
def read_news(db: Session = Depends(get_db)):
    return db.query(models.News).order_by(models.News.created_at.desc()).all()

@app.get("/api/news/{id}", response_model=schemas.News)
def read_single_news(id: int, db: Session = Depends(get_db)):
    db_news = db.query(models.News).filter(models.News.id == id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="Notícia não encontrada")
    return db_news

@app.post("/api/news", response_model=schemas.News)
def create_news(news: schemas.NewsCreate, db: Session = Depends(get_db)):
    data = news.dict() if hasattr(news, "dict") else news.model_dump()
    db_news = models.News(**data)
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news

@app.put("/api/news/{id}", response_model=schemas.News)
def update_news(id: int, news: schemas.NewsCreate, db: Session = Depends(get_db)):
    db_news = db.query(models.News).filter(models.News.id == id).first()
    if not db_news: raise HTTPException(status_code=404)
    data = news.dict() if hasattr(news, "dict") else news.model_dump()
    for key, value in data.items(): setattr(db_news, key, value)
    db.commit(); db.refresh(db_news)
    return db_news

@app.delete("/api/news/{id}")
def delete_news(id: int, db: Session = Depends(get_db)):
    db_news = db.query(models.News).filter(models.News.id == id).first()
    db.delete(db_news)
    db.commit()
    return {"message": "Excluído com sucesso"}

# ---- ROTAS DE PEDIDOS DE ADOÇÃO ---- #

@app.get("/api/adoptions", response_model=List[schemas.AdoptionRequest])
def read_adoptions(db: Session = Depends(get_db)):
    return db.query(models.AdoptionRequest).order_by(models.AdoptionRequest.created_at.desc()).all()

@app.post("/api/adoptions", response_model=schemas.AdoptionRequest)
def create_adoption_request(req: schemas.AdoptionRequestCreate, db: Session = Depends(get_db)):
    data = req.dict() if hasattr(req, "dict") else req.model_dump()
    db_req = models.AdoptionRequest(**data)
    db.add(db_req)
    db.commit()
    db.refresh(db_req)
    return db_req

@app.delete("/api/adoptions/{id}")
def delete_adoption_request(id: int, db: Session = Depends(get_db)):
    db_req = db.query(models.AdoptionRequest).filter(models.AdoptionRequest.id == id).first()
    if not db_req:
        raise HTTPException(status_code=404, detail="Pedido não encontrado")
    db.delete(db_req)
    db.commit()
    return {"message": "Deletado com sucesso"}
