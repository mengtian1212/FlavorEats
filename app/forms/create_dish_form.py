from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length, Optional
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class NewDishForm(FlaskForm):
    image = FileField("Image File", validators=[
                      FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    item_name = StringField("Item name", validators=[
                            DataRequired(), Length(min=1, max=50)])
    price = DecimalField("Price", validators=[
                         NumberRange(0, 1000)])
    description = StringField("Description", validators=[
                              Optional(), Length(min=10, max=2000)])
    item_type = StringField('Item category', validators=[
                            DataRequired(), Length(min=1, max=50)])
    calory = IntegerField('Calory')

    restaurant_id = IntegerField("Restaurant id", validators=[DataRequired()])
