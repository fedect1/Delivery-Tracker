const initialOrders = [
    {   
        "trackerNumber": "ORD-98765ZYX",
        "costumerInfo": {
            "name": "Jane Smith",
            "phone": "987-654-3210",
            "address": "456 Elm St, Townsville, Nation",
            "email": "janesmith@example.com"
        },
        "orderDetails": {
            "items": [
                {
                    "itemName": "Grapes",
                    "quantity": 5,
                    "pricePerItem": 0.6
                },
                {
                    "itemName": "Mango",
                    "quantity": 4,
                    "pricePerItem": 1.0
                },
                {
                    "itemName": "Strawberry",
                    "quantity": 15,
                    "pricePerItem": 0.4
                }
            ],
            "totalPrice": 10.5
        },
        "status": "preparing",
        "statusUpdates": [
            {
                "timestamp": "2023-10-23T11:10:00Z",
                "update": "Order has been confirmed and is currently being prepared."
            }
        ]
    },
    {
        "trackerNumber": "ORD-12345ABC",
        "costumerInfo": {
            "name": "John Smith",
            "phone": "123-456-7890",
            "address": "123 Main St, Townsville, Nation",
            "email": "fede@fede.com"
        },
        "orderDetails": {
            "items": [
                {
                    "itemName": "Apple",
                    "quantity": 5,
                    "pricePerItem": 0.6
                },
                {
                    "itemName": "Orange",
                    "quantity": 4,
                    "pricePerItem": 1.0
                },
                {
                    "itemName": "Banana",
                    "quantity": 15,
                    "pricePerItem": 0.4
                }
            ],
        },
        "status": "preparing",
        "_id": "654fa924b6ed7a7c8f9e55fd",
        "statusUpdates": [
            {
                "timestamp": "2023-10-23T11:10:00Z",
                "update": "Order has been confirmed and is currently being prepared."
            }
        ]
    }
]
const initialUsers = [
    {
        "username": "user1",
        "email": "user1@gmail.com",
        "password": "123456789Ab#",
    },
    {
        "username": "user2",
        "email": "user2@gmail.com",
        "password": "123456789Ab*",
    },
]
export {initialOrders, initialUsers}