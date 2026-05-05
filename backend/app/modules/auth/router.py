from fastapi import APIRouter, Depends, HTTPException
from app.modules.auth.schemas import LoginRequest, LoginResponse, UserCreate, UserResponse
from app.modules.auth.service import AuthService
from app.shared.unit_of_work import UnitOfWork
from app.core.database import SessionLocal
from app.shared.exceptions import AppException

router = APIRouter(prefix="/api/auth", tags=["Auth"])

def get_uow():
    return UnitOfWork(SessionLocal)

def get_auth_service(uow: UnitOfWork = Depends(get_uow)):
    return AuthService(uow)

@router.post("/login", response_model=LoginResponse)
def login(credentials: LoginRequest, service: AuthService = Depends(get_auth_service)):
    try:
        user = service.authenticate_user(credentials)
        return LoginResponse(
            success=True,
            message="Login exitoso",
            user=user
        )
    except AppException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)

@router.post("/register", response_model=UserResponse)
def register(data: UserCreate, service: AuthService = Depends(get_auth_service)):
    try:
        return service.register_user(data)
    except AppException as e:
        raise HTTPException(status_code=e.status_code, detail=e.message)
