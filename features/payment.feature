Feature: Payment
  In order to keep Payment api stable
  As a tester
  I want to make sure that everything works as expected

  Scenario: Add Payment
    Given I make a POST request to /api/payments
      And I set body to
      """
      {
        "orderId": "a6ce76bf-c95e-43a9-adec-cb47ab17ee1b"
      }
      """
     When I receive a response
     Then I expect response should have a status 201
      And I expect response should have a json schema
      """
      {
        "type": "object",
        "properties": {
          "id": {
            "type": "string"
          },
          "createdAt": {
            "type": "string"
          },
          "updatedAt": {
            "type": "string"
          },
          "deletedAt": {
            "type": "null"
          },
          "orderId": {
            "type": "string"
          }
        }
      }
      """