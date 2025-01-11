from sqlalchemy.orm import Session

from backend.schemas import Suppliercreate, ComplianceRecordBase, Compliancecreate
from backend import models,schemas

def get_suppliers(db: Session):
    return db.query(models.Supplier).all()

def get_supplier_by_id(db:Session,supplier_id):
    return db.query(models.Supplier).filter(models.Supplier.id==supplier_id).first()

def create_supplier(db:Session,supplier: Suppliercreate):
    db_supplier=models.Supplier(**supplier.model_dump())
    db.add(db_supplier)
    db.commit()
    db.refresh(db_supplier)
    return db_supplier

def create_compliancerecord(db:Session,record:Compliancecreate):
    db_compliancerecord=models.Compliance_record(**record.model_dump())
    db.add(db_compliancerecord)
    db.commit()
    db.refresh(db_compliancerecord)
    return db_compliancerecord

def get_compliancerecord(db: Session):
    return db.query(models.Compliance_record).all()