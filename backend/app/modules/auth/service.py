from app.shared.unit_of_work import UnitOfWork
from app.shared.exceptions import UnauthorizedException, BadRequestException
from app.modules.auth.schemas import LoginRequest, UserResponse, UserCreate
from app.modules.auth.utils import verify_password, get_password_hash

class AuthService:
    def __init__(self, uow: UnitOfWork):
        self.uow = uow

    def authenticate_user(self, credentials: LoginRequest) -> UserResponse:
        with self.uow:
            user = self.uow.users.get_by_email_or_username(credentials.usernameOrEmail)
            if not user or not verify_password(credentials.password, user.hashed_password):
                raise UnauthorizedException("Credenciales inválidas")
            
            return UserResponse(
                id=user.id,
                username=user.username,
                email=user.email,
                nombre=user.nombre,
                rol=user.rol
            )

    def register_user(self, data: UserCreate) -> UserResponse:
        with self.uow:
            if self.uow.users.get_by_email(data.email):
                raise BadRequestException("El email ya está registrado")
            if self.uow.users.get_by_username(data.username):
                raise BadRequestException("El nombre de usuario ya está en uso")
            
            user_data = {
                "username": data.username,
                "email": data.email,
                "nombre": data.nombre,
                "hashed_password": get_password_hash(data.password),
                "rol": "Encargado" # Rol por defecto para nuevos registros
            }
            
            user = self.uow.users.create(user_data)
            self.uow.commit()
            
            return UserResponse(
                id=user.id,
                username=user.username,
                email=user.email,
                nombre=user.nombre,
                rol=user.rol
            )
