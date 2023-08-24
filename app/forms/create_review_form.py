from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    message = StringField("Message", validators=[DataRequired()])
    rating = IntegerField("Rating")
