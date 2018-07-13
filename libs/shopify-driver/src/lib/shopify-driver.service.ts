import {ApolloModule, Apollo} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { Observable } from 'apollo-link';
import { ApolloQueryResult } from 'apollo-client';
import { HttpHeaders } from '@angular/common/http';


class ProductService {
    private apollo : Apollo;

    constructor(apollo: Apollo, httpLink: HttpLink) {

        const headers = new HttpHeaders({
            "X-Shopify-Storefront-Access-Token": "9419ecdd446b983348bc3b47dccc8b84"
        });

        apollo.create({
            link: httpLink.create({
                uri: 'https://daffodil-demo-alpha.myshopify.com/graphql',
                headers: headers
            }),
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