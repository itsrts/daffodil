import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Observable } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';


class ProductService {
    private apollo : Apollo;

    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({uri: 'https://daffodil-demo-alpha.myshopify.com/graphql'}),
            cache: new InMemoryCache(),
        });
        this.apollo = apollo;
    }

    getAll() : Observable<T>  {
        const query = gql`
        {
            shop {
                products(first: 250) {
                    edges {
                        node {
                            id
                        }
                    }
                } 
            }
        }
        `;

        return this.apollo.query({
            query: query
        });

    }
}