from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, Optional


class ReviewForm(FlaskForm):
    message = StringField("Message", validators=[
                          DataRequired(), Length(min=10)])
    rating = IntegerField("Rating")
    order_id = IntegerField("Order ID", validators=[Optional()])
