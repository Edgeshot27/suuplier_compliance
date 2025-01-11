from sqlalchemy import Column,Integer,String, JSON,ForeignKey,Date
from sqlalchemy.orm import relationship
from backend.database import Base

class Supplier(Base):
    __tablename__ = 'supplier'
    id=Column(Integer,primary_key=True,autoincrement=True)
    name=Column(String,index=True)
    country=Column(String)
    contract_terms=Column(JSON)
    Compliance_score=Column(Integer,default=100)
    last_audit=Column(Date)
    compliance_records = relationship('ComplianceRecord', order_by='ComplianceRecord.id', back_populates='supplier')
class ComplianceRecord(Base):
    __tablename__ = 'ComplianceRecord'
    id=Column(Integer,primary_key=True,autoincrement=True)
    supplier_id=Column(Integer,ForeignKey('supplier.id'))
    metric=Column(String)
    Daterecorded=Column(Date)
    result=Column(Integer)
    status=Column(String)
    supplier = relationship('Supplier', back_populates='compliance_records')






