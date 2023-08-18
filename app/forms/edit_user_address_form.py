from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class EditUserAddressForm(FlaskForm):
    updatedAddress = StringField("myAddress", validators=[DataRequired()])
