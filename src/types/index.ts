export type Product = GraphQLProducts["edges"][number]["node"];

export type GraphQLProducts = {
  edges: {
    node: {
      id: string;
      title: string;
      description: string;
      handle: string;
      tags: string[];
      images: {
        edges: {
          node: {
            originalSrc: string;
            altText: string;
          };
        }[];
      };
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
          };
        }[];
      };
    };
  }[];
};

export type GraphQLCart = {
  id: string;
  attributes: [];
  checkoutUrl: string;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  createdAt: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        attributes: [];
        merchandise: {
          id: string;
          title: string;
          product: {
            id: string;
            handle: string;
            title: string;
            tags: string[];
            featuredImage: {
              id: string;
              url: string;
              altText: string;
            };
          };
        };
      };
    }[];
  };
  updatedAt: string;
  totalQuantity: number;
};

export type GraphQLCustomer = {
  id: string;
  email: string;
  orders: {
    edges: {
      node: {
        id: string;
        orderNumber: number;
        name: string;
        fulfillmentStatus: string;
        email: string;
        canceledAt: string;
        cancelReason: string;
        lineItems: {
          edges: {
            node: {
              title: string;
              quantity: number;
            };
          };
        };
      };
    };
  };
};

export type GraphQLOrders = {
  orders: {
    edges: {
      node: {
        id: string;
        tags: string[];
        lineItems: {
          edges: {
            node: {
              quantity: number;
              customAttributes: {
                key: string;
                value: string;
              }[];
            };
          }[];
        };
      };
    }[];
  };
};
