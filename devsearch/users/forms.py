from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django import forms
from .models import User


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            "first_name",
            "email",
            "username",
            "password1",  # standard django documentation shows this is first password
            "password2",  # this is confirm password
        ]
        labels = {"first_name": "Name"}
        # widgets = {"tags": forms.CheckboxSelectMultiple()}

    # def __init__(self, *args, **kwargs):
    #     super(ProjectForm, self).__init__(*args, **kwargs)

    #     for name, field in self.fields.items():
    #         field.widget.attrs.update({"class": "input"})
