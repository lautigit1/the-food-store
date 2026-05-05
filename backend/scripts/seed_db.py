import os
import sys
from sqlalchemy.orm import Session

# Add the backend directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.database import SessionLocal, create_tables
from app.modules.insumos.models import InsumoModel
from app.shared.unit_of_work import UnitOfWork
from app.modules.auth.utils import get_password_hash

SEED_DATA_INSUMOS = [
    {"nombre": "Harina 000", "descripcion": "Harina refinada", "categoria": "Materia prima", "unidad_medida": "kg", "stock_actual": 50, "stock_minimo": 10, "precio_unitario": 800, "estado": "Activo"},
    {"nombre": "Pan brioche", "descripcion": "Pan de hamburguesa artesanal", "categoria": "Panificados", "unidad_medida": "unidad", "stock_actual": 100, "stock_minimo": 20, "precio_unitario": 350, "estado": "Activo"},
    {"nombre": "Carne molida premium", "descripcion": "Roast beef picado", "categoria": "Carnes", "unidad_medida": "kg", "stock_actual": 30, "stock_minimo": 5, "precio_unitario": 6500, "estado": "Activo"},
    {"nombre": "Queso cheddar", "descripcion": "Fetas de cheddar", "categoria": "Lácteos", "unidad_medida": "kg", "stock_actual": 15, "stock_minimo": 3, "precio_unitario": 8000, "estado": "Activo"},
    {"nombre": "Café en grano", "descripcion": "Café tostado colombiano", "categoria": "Café", "unidad_medida": "kg", "stock_actual": 5, "stock_minimo": 2, "precio_unitario": 15000, "estado": "Activo"},
    {"nombre": "Leche", "descripcion": "Leche entera", "categoria": "Lácteos", "unidad_medida": "l", "stock_actual": 40, "stock_minimo": 10, "precio_unitario": 1100, "estado": "Activo"},
    {"nombre": "Tomate", "descripcion": "Tomate redondo", "categoria": "Verduras", "unidad_medida": "kg", "stock_actual": 12, "stock_minimo": 4, "precio_unitario": 2000, "estado": "Activo"},
    {"nombre": "Lechuga", "descripcion": "Lechuga repollada", "categoria": "Verduras", "unidad_medida": "kg", "stock_actual": 8, "stock_minimo": 2, "precio_unitario": 1500, "estado": "Activo"},
    {"nombre": "Aceite de oliva", "descripcion": "Aceite extra virgen", "categoria": "Materia prima", "unidad_medida": "l", "stock_actual": 10, "stock_minimo": 3, "precio_unitario": 9000, "estado": "Activo"},
    {"nombre": "Chocolate", "descripcion": "Cobertura semi amarga", "categoria": "Repostería", "unidad_medida": "kg", "stock_actual": 7, "stock_minimo": 2, "precio_unitario": 12000, "estado": "Activo"},
    {"nombre": "Azúcar", "descripcion": "Azúcar blanca", "categoria": "Materia prima", "unidad_medida": "kg", "stock_actual": 20, "stock_minimo": 5, "precio_unitario": 900, "estado": "Activo"},
    {"nombre": "Sal marina", "descripcion": "Sal gruesa", "categoria": "Condimentos", "unidad_medida": "kg", "stock_actual": 10, "stock_minimo": 2, "precio_unitario": 1200, "estado": "Activo"},
    {"nombre": "Envases descartables", "descripcion": "Cajas de cartón para delivery", "categoria": "Packaging", "unidad_medida": "caja", "stock_actual": 500, "stock_minimo": 100, "precio_unitario": 150, "estado": "Activo"},
    {"nombre": "Papas congeladas", "descripcion": "Papas corte bastón", "categoria": "Materia prima", "unidad_medida": "kg", "stock_actual": 60, "stock_minimo": 15, "precio_unitario": 2200, "estado": "Activo"},
    {"nombre": "Salsa barbacoa", "descripcion": "Salsa BBQ casera", "categoria": "Condimentos", "unidad_medida": "l", "stock_actual": 5, "stock_minimo": 2, "precio_unitario": 4000, "estado": "Activo"}
]

SEED_DATA_USERS = [
    {
        "username": "admin",
        "email": "admin@thefoodstore.com",
        "password": "admin123",
        "nombre": "Administrador Principal",
        "rol": "Admin",
    },
    {
        "username": "encargado",
        "email": "encargado@thefoodstore.com",
        "password": "encargado123",
        "nombre": "Encargado de Inventario",
        "rol": "Encargado",
    }
]

def seed_database():
    create_tables()
    uow = UnitOfWork(SessionLocal)
    
    try:
        with uow:
            # Seed Insumos
            count_insumos = uow.insumos.count_all()
            if count_insumos == 0:
                print("Poblando la base de datos con insumos iniciales...")
                for data in SEED_DATA_INSUMOS:
                    uow.insumos.create(data)
                uow.commit()
                print(f"¡Éxito! Se han creado {len(SEED_DATA_INSUMOS)} insumos.")
            else:
                print(f"La base de datos ya contiene {count_insumos} insumos. Saltando el seed de insumos.")
                
            # Seed Users
            user_admin = uow.users.get_by_username("admin")
            if not user_admin:
                print("Poblando la base de datos con usuarios iniciales...")
                for data in SEED_DATA_USERS:
                    user_data = data.copy()
                    user_data["hashed_password"] = get_password_hash(user_data.pop("password"))
                    uow.users.create(user_data)
                uow.commit()
                print(f"¡Éxito! Se han creado {len(SEED_DATA_USERS)} usuarios.")
            else:
                print("La base de datos ya contiene usuarios iniciales. Saltando el seed de usuarios.")
                
    except Exception as e:
        print(f"Error al poblar la BD: {e}")

if __name__ == "__main__":
    seed_database()
