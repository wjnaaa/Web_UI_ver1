from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField

class PRForm(FlaskForm):
    material_code = StringField("รหัสวัสดุ")
    quantity = FloatField("จำนวนที่ต้องการ")
    submit = SubmitField("สร้าง PR")
