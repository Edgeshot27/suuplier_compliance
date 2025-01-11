from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import schemas, setup
from backend import crud, database
from typing import List

from backend.database import Sessionlocal
from backend.setup import analyze_compliance_with_llm
router = APIRouter()

@router.post("/analyze-compliance/")
def analyze_compliance(record: schemas.Compliancecreate, db: Session = Depends(database.get_db)):
    compliance_records = crud.get_compliancerecord(db)
    # Format data to be analyzed
    data_to_analyze = [
        {
            "metric": rec.metric,
            "status": rec.status,
        }
        for rec in compliance_records
    ]
    llm_result = analyze_compliance_with_llm(data_to_analyze)
    return {"message": "Compliance analysis completed using LLM!", "insights": llm_result}


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

@router.get("/suppliers", response_model=List[schemas.Supplier])
def get_suppliers(db: Session = Depends(database.get_db)):
    return crud.get_suppliers(db)

@router.post("/suppliers", response_model=schemas.Supplier)
def create_supplier(supplier_in: schemas.Suppliercreate, db: Session = Depends(database.get_db)):
    return crud.create_supplier(db, supplier_in)

@router.get("/compliance", response_model=List[schemas.Compliance])
def get_compliance_records(db: Session = Depends(database.get_db)):
    return crud.get_compliancerecord(db)

@router.post("/compliance", response_model=schemas.Compliance)
def create_compliance_record(
    record: schemas.Compliancecreate, db: Session = Depends(database.get_db)
):
    return crud.create_compliancerecord(db, record)

@router.get("/suppliers/{supplier_id}", response_model=schemas.Supplier)
def get_supplier_compliance(supplier_id: int, db: Session = Depends(database.get_db)):
    # Retrieve compliance records for the given supplier ID
    compliance_records = crud.get_compliance_by_supplier(db, supplier_id)
    if not compliance_records:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return compliance_records


@router.post("/weather-impact")
def check_weather_impact(
        request: schemas.WeatherImpactRequest, db: Session = Depends(database.get_db)
):
    # Fetch weather data
    weather_data = setup.get_weather(request.latitude, request.longitude, request.delivery_date)

    if not weather_data:
        raise HTTPException(status_code=404, detail="Weather data not found")


    if setup.check_adverse_weather(weather_data):

        compliance_record = schemas.Compliancecreate(
            supplier_id=request.supplier_id,
            metric="Weather Impact",
            Daterecorded=datetime.now(),
            result=0,
            status="Excused - Weather Delay"
        )
        crud.create_compliancerecord(db, compliance_record)
        return {"weather_impact": "Adverse Weather", "compliance_status": "Excused - Weather Delay"}

    return {"message": "No adverse weather conditions. No impact on delivery."}