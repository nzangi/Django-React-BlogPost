from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from django.utils import timezone
from django.contrib.auth import get_user_model

# Get the User model
User = get_user_model()


# This receiver function will be called whenever a user logs out
@receiver(user_logged_in)
def update_last_login(sender, user, request, **kwargs):
    user.last_login = timezone.now()  # Import timezone from django.utils if not already imported
    user.save(update_fields=['last_login'])
