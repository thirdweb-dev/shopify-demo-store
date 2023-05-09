export const PRODUCTS_QUERY = `query products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          tags
          images(first: 1) {
            edges {
              node {
                originalSrc
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `#graphql
  query product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      tags
      images(first: 1) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = `
mutation cartCreate {
  cartCreate {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`;

export const GET_CART_QUERY = `#graphql
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      createdAt
      updatedAt
      checkoutUrl
      totalQuantity
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                quantityAvailable
                product {
                  id
                  handle
                  title
                  tags
                  featuredImage {
                    id
                    url
                    altText
                  }
                }
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      attributes {
        key
        value
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
      buyerIdentity {
        email
        phone
        customer {
          id
        }
        countryCode
      }
    }
  }
`;

export const ADD_CART_LINE_MUTATION = `#graphql
  mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10){
          edges
          {
            node{
              quantity
              merchandise{
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
    userErrors {
      field
      message
    }
  }
}
`;

export const EDIT_CART_LINE_MUTATION = `#graphql
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 10){
          edges
          {
            node{
              quantity
              merchandise{
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
          totalDutyAmount {
            amount
            currencyCode
          }
        }
      }
    userErrors {
      field
      message
    }
  }
}
`;

export const GET_ORDERS_QUERY = `#graphql
  query getOrdersBySku($query: String!) {
    orders(first: 25, query: $query) {
      edges {
        node {
          id
          tags
          lineItems(first: 10) {
            edges {
              node {
                quantity
                customAttributes {
                  key
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT_MUTATION = `#graphql
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const DELETE_LINE_FROM_CART_MUTATION = `#graphql
mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
  cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
    cart {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

export const GET_ORDER_BY_ID_QUERY = `#graphql
  query getOrderById($id: ID!) {
    order(id: $id) {
      id
      tags
      lineItems(first: 10) {
        edges {
          node {
            id
            quantity
            variant {
              id
              product {
                id
                title
                description
                featuredImage {
                  id
                  url
                }
              }
            }
            customAttributes {
              key
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = `#graphql
  query getProductById($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      description
      tags
      images(first: 1) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first: 5) {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
`;
