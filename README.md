# Prodavalko website - Hosted/Database/Authentication in Firebase

## Authentication

1. Users can regiter an account and log in
2. Authentication with email and password
3. Register with Username, email, password, and phone number
4. Upon authentication users are redirected to the Home page automatically
5. Logged in users can
   - View Catalog items
   - Offer creator Profile page
   - Create offers
   - Like offers by Other offer creators
   - Edit or Delete own offers
6. Guests can
   - View Catalog items
   - View Profile page for other creators

## Offers

1. Offers contain
   - Offer image
   - Details: Name, Price (min 0, floating point numbers supported), Description, Contact number
   - The contact number can be changed at the Profile page and it will be updated in the offer
   - Link to creator Profile page
   - Like button

## Creating offer

    - Has form verification
    - All fields required before we post the offer

## Profile page

    - Can add an Avatar (if no avatar then we show default photo)
    - User Likes available for account owner
    - Can edit the phone number if the owner is logged in

## Other

    - Added custom Alert and Confirm dialog boxes
    - Can turn Passwords visible when Loggin in or Registering
