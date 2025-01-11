from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from backend import schemas
from backend import crud, database
from typing import List

from backend.database import Sessionlocal

router=APIRouter()


@router.get("/test")
def test():
    try:
        # Test database connection
        db = Sessionlocal()
        db.execute("SELECT 1")
        db.close()
        return {"message": "API and database are working!"}
    except Exception as e:
        return {"error": f"Database connection failed: {str(e)}"}
@router.get("/suppliers",response_model=List[schemas.Supplier])
def get_suppliers(db:Session=Depends(database.get_db)):
    return crud.get_suppliers(db)

@router.post("/suppliers",response_model=schemas.Supplier)
def create_supplier(supplier_in:schemas.Suppliercreate, db:Session=Depends(database.get_db)):
    return crud.create_supplier(db, supplier_in)

@router.get("/compliance", response_model=List[schemas.Compliance])
def get_compliance_records(db: Session = Depends(database.get_db)):  # Remove parentheses here
    return crud.get_compliancerecord(db)

@router.post("/compliance", response_model=schemas.Compliance)
def create_compliance_record(
    record: schemas.Compliancecreate, db: Session = Depends(database.get_db)
):
    return crud.create_compliancerecord(db, record)