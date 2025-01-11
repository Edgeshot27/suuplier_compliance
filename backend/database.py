from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL="postgresql://postgres:Edgeshot@localhost:5432/suppliers"
engine=create_engine(DATABASE_URL)
Sessionlocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)
Base=declarative_base()

def get_db():
    db=Sessionlocal()
    try:
        yield db
    finally:
        db.close()