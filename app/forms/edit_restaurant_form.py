from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length, Optional
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class EditRestaurantForm(FlaskForm):
    image = FileField("Image File", validators=[
                      FileAllowed(list(ALLOWED_EXTENSIONS))])
    address = StringField('Address', validators=[
                          DataRequired(), Length(min=1, max=255)])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired()])
    name = StringField('Name', validators=[
                       DataRequired(), Length(min=1, max=120)])
    cusine_types = StringField('Cusine types', validators=[DataRequired()])
    lat = StringField('Latitute', validators=[DataRequired()])
    lng = StringField('Longitude', validators=[DataRequired()])

    price_ranges = StringField("Price ranges", validators=[DataRequired()])
    delivery_fee = StringField("Delivery fee", validators=[DataRequired()])
    description = StringField("Description", validators=[
                              Optional(), Length(min=10, max=2000)])
