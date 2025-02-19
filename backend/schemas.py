from pydantic import BaseModel
from typing import List,Optional
from datetime import date, datetime
from backend.models import ComplianceRecord

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
    compliance_records:List['Compliance']=[]

    class Config:
        orm_mode=True
        from_orm = True
        use_enum_values = True
        arbitrary_types_allowed = True

class ComplianceRecordBase(BaseModel):
    supplier_id:int
    metric:str
    Daterecorded:datetime
    result:int
    status:str

class Compliancecreate(ComplianceRecordBase):
    pass

class Compliance(ComplianceRecordBase):
    id:int

    class Config:
        orm_mode=True

class WeatherImpactRequest(BaseModel):
    supplier_id: int
    latitude: float
    longitude: float
    delivery_date: str
Supplier.model_rebuild()
Compliance.model_rebuild()