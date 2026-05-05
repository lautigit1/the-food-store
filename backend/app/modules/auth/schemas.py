from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    usernameOrEmail: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    nombre: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    nombre: str
    rol: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    user: UserResponse
