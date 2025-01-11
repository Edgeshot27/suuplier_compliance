from pydantic import BaseModel
from typing import List,Optional
from datetime import date

class SupplierBase(BaseModel):
    name:str
    country:str
    contract_terms:dict
    Compliance_score:Optional[int]=100
    last_audit:Optional[date]

class Suppliercreate(SupplierBase):
    pass

class Supplier(SupplierBase):
    id:int
    compliance_records:List['ComplianceRecord']=[]

    class Config:
        orm_mode=True

class ComplianceRecordBase(BaseModel):
    supplier_id:int
    metric:str
    Daterecorded:Optional[date]
    result:int
    status:str

class Compliancecreate(ComplianceRecordBase):
    pass

class Compliance(ComplianceRecordBase):
    id:int

    class Config:
        orm_mode=True
