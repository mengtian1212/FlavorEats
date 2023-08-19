from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length

USSTATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
]


# check state: 1. should be 2 characters. 2. should within USSTATES
def validate_state(form, field):
    state = field.data

    if len(state) != 2:
        raise ValidationError(
            'Invalid format : eg. Address name, 123 main street, new york, ny 10000')
    if state not in USSTATES:
        raise ValidationError(
            'Invalid format : eg. Address name, 123 main street, new york, ny 10000')


# check zip code: should be 5 characters.
def validate_zip(form, field):
    zip = field.data
    if len(zip) != 5:
        raise ValidationError(
            'Invalid format : eg. Address name, 123 main street, new york, ny 10000')


class EditUserAddressForm(FlaskForm):
    address = StringField('Address', validators=[
                          DataRequired(), Length(min=1, max=255)])
    city = StringField('City', validators=[
                       DataRequired(), Length(min=1, max=40)])
    state = StringField('State', validators=[DataRequired(), validate_state])
    zip = StringField('Zip', validators=[DataRequired(), validate_zip])
