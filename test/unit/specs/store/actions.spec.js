import td from 'testdouble'
import api from '@molgenis/molgenis-api-client'
import actions, {
  GET_ALL_BIOBANKS,
  FIND_BIOBANKS,
  GET_COLLECTION_QUALITY_COLLECTIONS,
  GET_DATA_TYPE_OPTIONS,
  GET_TYPES_OPTIONS,
  SEND_TO_NEGOTIATOR,
  GET_NEXT_BIOBANKS,
  GET_INITIAL_BIOBANKS
} from '../../../../src/store/actions'
import utils from '@molgenis/molgenis-vue-test-utils'
import {
  MAP_QUERY_TO_STATE,
  SET_ALL_BIOBANKS,
  SET_FOUND_BIOBANKS,
  SET_BIOBANK_REPORT,
  SET_COLLECTION_REPORT,
  SET_COLLECTION_QUALITY,
  SET_COLLECTION_TYPES,
  SET_COUNTRIES,
  SET_DATA_TYPES,
  SET_DIAGNOSIS_AVAILABLE,
  SET_ERROR,
  SET_LOADING,
  SET_NETWORK_REPORT,
  SET_MATERIALS,
  SET_COLLECTION_QUALITY_COLLECTIONS,
  SET_BIOBANK_QUALITY_BIOBANKS,
  SET_BIOBANK_QUALITY, SET_NETWORK_BIOBANKS, SET_NETWORK_COLLECTIONS, SET_IS_PAGINATING, SET_NEXT_PAGE, APPEND_NEW_BIOBANKS, SET_COVID_19
} from '../../../../src/store/mutations'
import helpers from '../../../../src/store/helpers'

describe('store', () => {
  describe('actions', () => {
    afterEach(() => td.reset())

    describe('GET_COUNTRIES', () => {
      it('should retrieve list of available countries from the server and store them in the state', done => {
        const response = {
          items: [
            {id: 'NL', label: 'Netherlands'},
            {id: 'BE', label: 'Belgium'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_countries')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_COUNTRIES, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_COUNTRY_OPTIONS__, options, done)
      })
    })

    describe('GET_TYPES_OPTIONS', () => {
      it('should retrieve list of available collection types from the server and store them in the state', done => {
        const response = {
          items: [
            {
              _href: '/api/v2/eu_bbmri_eric_collection_types/BIRTH_COHORT',
              description: 'A cohort study for which the subjects are followed from the time of birth usually including information about gestation and follow up.',
              id: 'BIRTH_COHORT',
              label: 'Birth cohort'
            },
            {
              _href: '/api/v2/eu_bbmri_eric_collection_types/CASE_CONTROL',
              description: 'A case-control study design compares two groups of subjects: those with the disease or condition under study (cases) and a very similar group of subjects who do not have the disease or condition (controls).',
              id: 'CASE_CONTROL',
              label: 'Case-Control'
            }
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_collection_types')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_COLLECTION_TYPES, payload: response.items}
          ]
        }

        utils.testAction(actions[GET_TYPES_OPTIONS], options, done)
      })
    })

    describe('GET_DATA_TYPES_OPTIONS', () => {
      it('should retrieve list of available collection types from the server and store them in the state', done => {
        const response = {
          items: [
            {
              _href: '/api/v2/eu_bbmri_eric_data_types/BIOLOGICAL_SAMPLES',
              description: 'Y/N if biological samples are collected from the participants in the sample collection/study',
              id: 'BIOLOGICAL_SAMPLES',
              label: 'Biological samples'
            },
            {
              _href: '/api/v2/eu_bbmri_eric_data_types/GENEALOGICAL_RECORDS',
              description: 'Y/N if genealogical records are associated with the participants in the sample collection/study',
              id: 'GENEALOGICAL_RECORDS',
              label: 'Genealogical records',
              ontology: 'Miabis'
            }
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_data_types')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_DATA_TYPES, payload: response.items}
          ]
        }

        utils.testAction(actions[GET_DATA_TYPE_OPTIONS], options, done)
      })
    })

    describe('GET_MATERIALS', () => {
      it('should retrieve list of available material types from the server and store them in the state', done => {
        const response = {
          items: [
            {id: 'RNA', label: 'RNA'},
            {id: 'PLASMA', label: 'Plasma'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_material_types')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_MATERIALS, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_MATERIALS_OPTIONS__, options, done)
      })
    })

    describe('GET_COLLECTION_QUALITY_OPTIONS', () => {
      it('should retrieve list of available collection quality standards from the server and store them in the state', done => {
        const response = {
          items: [
            {id: 'a-cool_standard', label: 'A cool standard'},
            {id: 'a-smart_standard', label: 'A smart standard'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_assess_level_col')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_COLLECTION_QUALITY, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_COLLECTION_QUALITY_OPTIONS__, options, done)
      })
    })

    describe('GET_BIOBANK_QUALITY_OPTIONS', () => {
      it('should retrieve list of available biobank quality standards from the server and store them in the state', done => {
        const response = {
          items: [
            {id: 'a-cool_standard', label: 'A cool standard'},
            {id: 'a-smart_standard', label: 'A smart standard'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_assess_level_bio')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_BIOBANK_QUALITY, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_BIOBANK_QUALITY_OPTIONS__, options, done)
      })
    })

    describe('GET_COVID_19_OPTIONS', () => {
      it('should retrieve list of available covid19 options from the server and store them in the state', done => {
        const response = {
          items: [
            {id: 'covid19', label: 'Member of the COVID-19 network'}]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_COVID_19')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_COVID_19, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_COVID_19_OPTIONS__, options, done)
      })
    })

    describe('QUERY_DIAGNOSIS_AVAILABLE_OPTIONS', () => {
      it('should store an empty list in the state when query is empty', done => {
        const options = {
          payload: '',
          expectedMutations: [
            {type: SET_DIAGNOSIS_AVAILABLE, payload: []}
          ]
        }

        utils.testAction(actions.__QUERY_DIAGNOSIS_AVAILABLE_OPTIONS__, options, done)
      })

      it('should retrieve a list of disease types based on a search query from the server and store them in the state', done => {
        const response = {
          items: [{label: 'search'}]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_disease_types?q=label=q=search')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          payload: 'search',
          expectedMutations: [
            {type: SET_DIAGNOSIS_AVAILABLE, payload: response.items}
          ]
        }

        utils.testAction(actions.__QUERY_DIAGNOSIS_AVAILABLE_OPTIONS__, options, done)
      })

      it('should retrieve a list of disease types based on a code query from the server and store them in the state', done => {
        const response = {
          items: [{code: 'A01'}]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_disease_types?q=code=like=A01&sort=code')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          payload: 'a01',
          expectedMutations: [
            {type: SET_DIAGNOSIS_AVAILABLE, payload: response.items}
          ]
        }

        utils.testAction(actions.__QUERY_DIAGNOSIS_AVAILABLE_OPTIONS__, options, done)
      })
    })

    describe('GET_QUERY', () => {
      it('should commit GET_QUERY mutation when no diagnosis ids are in the URL', done => {
        const state = {
          route: {
            query: {
              country: 'NL,BE'
            }
          }
        }

        const options = {
          state: state,
          expectedMutations: [
            {type: MAP_QUERY_TO_STATE}
          ]
        }

        utils.testAction(actions.__GET_QUERY__, options, done)
      })

      it('should fetch diagnoses from the server and map result + URL query to state', done => {
        const state = {
          route: {
            query: {
              diagnosis_available: 'C18,L40'
            }
          }
        }

        const response = {
          items: [
            {code: 'C18'},
            {code: 'L40'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_disease_types?q=code=in=(C18,L40)')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          state: state,
          expectedMutations: [
            {type: MAP_QUERY_TO_STATE, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_QUERY__, options, done)
      })

      it('should trigger the action to get the collections matching the applied quality standards and map result + URL query to state', done => {
        const state = {
          route: {
            query: {
              collection_quality: 'eric,self'
            }
          }
        }
        const options = {
          state: state,
          expectedActions: [
            {type: GET_COLLECTION_QUALITY_COLLECTIONS}
          ],
          expectedMutations: [
            {type: MAP_QUERY_TO_STATE}
          ]
        }

        utils.testAction(actions.__GET_QUERY__, options, done)
      })
    })

    describe('GET_INITIAL_BIOBANKS', () => {
      it('should retrieve the first 40 biobanks from the server', done => {
        const response = {
          nextHref: 'foo',
          items: [
            {id: '1', name: 'biobank-1'},
            {id: '2', name: 'biobank-2'},
            {id: '3', name: 'biobank-3'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?num=40&sort=name:asc&attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),*')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          getters: {
            rsql: ''
          },
          expectedMutations: [
            {type: SET_ALL_BIOBANKS, payload: response.items},
            {type: SET_FOUND_BIOBANKS, payload: response.items.length},
            {type: SET_NEXT_PAGE, payload: response}
          ]
        }
        utils.testAction(actions[GET_INITIAL_BIOBANKS], options, done)
      })
    })

    describe('GET_ALL_BIOBANKS', () => {
      it('should retrieve all biobanks from the server', done => {
        const response = {
          nextHref: 'foo',
          items: [
            {id: '1', name: 'biobank-1'},
            {id: '2', name: 'biobank-2'},
            {id: '3', name: 'biobank-3'}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?num=10000&sort=name:asc&attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),*')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          expectedMutations: [
            {type: SET_FOUND_BIOBANKS, payload: undefined},
            {type: SET_IS_PAGINATING, payload: true},
            {type: SET_ALL_BIOBANKS, payload: response.items},
            {type: SET_FOUND_BIOBANKS, payload: response.items.length},
            {type: SET_NEXT_PAGE, payload: response}
          ]
        }

        utils.testAction(actions[GET_ALL_BIOBANKS], options, done)
      })
    })

    describe('SEND_TO_NEGOTIATOR', () => {
      const state = {
        search: 'Cell&Co',
        country: {filters: []},
        materials: {filters: ['CELL_LINES']},
        collection_quality: {filters: []},
        diagnosis_available: {filters: []},
        type: {filters: []},
        dataType: {filters: []}
      }
      const getters = {
        rsql: 'materials=in=(CELL_LINES);name=q="Cell&Co"',
        biobanks: [
          {id: 'biobank1', collections: [{id: 'collection1'}, {id: 'collection2'}]},
          {id: 'biobank2', collections: [{id: 'collection3'}, {id: 'collection4'}]}
        ]
      }
      const location = 'https://www.example.org/biobankexplorer?search=Cell%26Co&materials=CELL_LINES'

      it('should send a negotiator query to the server and then surf to the negotiator', (done) => {
        const post = td.function('api.post')
        const getLocationHref = td.function('getLocationHref')
        const setLocationHref = td.function('setLocationHref')
        td.replace(api, 'post', post)
        td.replace(helpers, 'setLocationHref', setLocationHref)
        td.replace(helpers, 'getLocationHref', getLocationHref)

        td.when(getLocationHref()).thenReturn(location)

        const bodyCaptor = td.matchers.captor()
        const negotiatorResponse = Promise.resolve('http://example.org/negotiator')
        td.when(post('/plugin/directory/export', bodyCaptor.capture())).thenReturn(negotiatorResponse)

        utils.testAction(actions[SEND_TO_NEGOTIATOR], {state, getters}, (arg) => {
          if (arg) {
            // testAction found an error
            done(arg)
          } else {
            negotiatorResponse.then(() => {
              expect(JSON.parse(bodyCaptor.value.body)).to.deep.eq({
                URL: location,
                entityId: 'eu_bbmri_eric_collections',
                rsql: 'materials=in=(CELL_LINES);name=q="Cell&Co"',
                collections: [
                  {collectionId: 'collection1', biobankId: 'biobank1'},
                  {collectionId: 'collection2', biobankId: 'biobank1'},
                  {collectionId: 'collection3', biobankId: 'biobank2'},
                  {collectionId: 'collection4', biobankId: 'biobank2'}],
                humanReadable: 'Free text search contains Cell&Co and selected material types are CELL_LINES'
              })
              td.verify(setLocationHref('http://example.org/negotiator'))
            }).then(done).catch(done)
          }
        })
      })

      it('should commit the error if the server response was bad', (done) => {
        const post = td.function('api.post')
        const getLocationHref = td.function('getLocationHref')
        td.replace(api, 'post', post)
        td.replace(helpers, 'getLocationHref', getLocationHref)

        td.when(getLocationHref()).thenReturn(location)

        const error = {errors: [{message: 'Negotiator not configured'}]}
        td.when(post('/plugin/directory/export', td.matchers.anything())).thenReject(error)

        utils.testAction(actions[SEND_TO_NEGOTIATOR], {
          state,
          getters,
          expectedMutations: [{type: SET_ERROR, payload: error}]
        }, done)
      })
    })

    describe('FIND_BIOBANKS', () => {
      it('should retrieve biobanks with collections matching the filters', done => {
        const response = {
          nextHref: '',
          total: 2,
          items: [
            {biobank: {id: 'biobank-1'}},
            {biobank: {id: 'biobank-2'}}
          ]
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?num=40&sort=name:asc&attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),*&q=name=q="Cell%26Co";country=in=(A,B)'))
          .thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          getters: {rsql: 'name=q="Cell&Co";country=in=(A,B)'},
          expectedMutations: [
            { type: SET_ALL_BIOBANKS, payload: undefined },
            { type: SET_IS_PAGINATING, payload: false },
            { type: SET_ALL_BIOBANKS, payload: response.items },
            { type: SET_FOUND_BIOBANKS, payload: response.total },
            { type: SET_NEXT_PAGE, payload: response }
          ]
        }

        utils.testAction(actions[FIND_BIOBANKS], options, done)
      })
    })

    describe('GET_COLLECTION_QUALITY_COLLECTIONS', () => {
      it('should retrieve the collections for which certain level of assessment is applied for the quality standards', done => {
        const response = {
          meta: {
            name: 'meta'
          },
          items: [
            {id: 'random-1', collection: 'col-1', quality_standard: '1', asses_level_col: 'eric'},
            {id: 'random-2', collection: 'col-1', quality_standard: '2', asses_level_col: 'self'},
            {id: 'random-3', collection: 'col-2', quality_standard: '2', asses_level_col: 'eric'}
          ]
        }

        const state = {
          route: {
            query: {
              collection_quality: 'eric,self'
            }
          }
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_col_qual_info?q=assess_level_col=in=(eric,self)')).thenResolve(response)
        td.replace(api, 'get', get)
        const options = {
          state: state,
          expectedMutations: [
            {type: SET_COLLECTION_QUALITY_COLLECTIONS, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_COLLECTION_QUALITY_COLLECTIONS__, options, done)
      })

      it('should pass empty array to mutation when no quality standards are selected', done => {
        const state = {
          route: {
            query: {}
          }
        }

        const options = {
          state: state,
          expectedMutations: [
            {type: SET_COLLECTION_QUALITY_COLLECTIONS, payload: []}
          ]
        }

        utils.testAction(actions.__GET_COLLECTION_QUALITY_COLLECTIONS__, options, done)
      })
    })

    describe('GET_NEXT_BIOBANKS', () => {
      it('should retrieve next biobanks and append these to the existing ones', done => {
        const response = {
          items: [
            {id: 'additional-biobank1'},
            {id: 'additional-biobank2'},
            {id: 'additional-biobank3'},
            {id: 'additional-biobank4'}
          ]
        }
        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?start=40&num=40&sort=name:asc&attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),*&q=name=q="Cell%26Co";country=in=(A,B)'))
          .thenResolve(response)
        td.replace(api, 'get', get)

        const state = {
          nextBiobankPage: '/api/v2/eu_bbmri_eric_biobanks?start=40&num=40&sort=name:asc&attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),*&q=name=q="Cell%26Co";country=in=(A,B)',
          allBiobanks: [{id: 'biobank1'},
            {id: 'biobank2'},
            {id: 'biobank3'},
            {id: 'biobank4'}]
        }

        const options = {
          state: state,
          expectedMutations: [
            { type: APPEND_NEW_BIOBANKS, payload: response.items },
            { type: SET_FOUND_BIOBANKS, payload: response.total },
            { type: SET_NEXT_PAGE, payload: response }
          ]
        }
        utils.testAction(actions[GET_NEXT_BIOBANKS], options, done)
      })
    })

    describe('GET_BIOBANK_REPORT', () => {
      it('should retrieve a single biobank entity from the server based on a biobank id and store it in the state', done => {
        const biobank = {
          _meta: {
            name: 'biobank'
          },
          id: 'biobank-1'
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_biobanks/biobank-1?attrs=collections(id,description,materials,diagnosis_available,name,type,order_of_magnitude(*),size,sub_collections(*),parent_collection,quality(*),data_categories),quality(id,standards(*),assess_level_bio(*),certification_number,certification_image_link,certification_report,label),contact(*),*')).thenResolve(biobank)
        td.replace(api, 'get', get)

        const options = {
          payload: 'biobank-1',
          expectedMutations: [
            {type: SET_LOADING, payload: true},
            {type: SET_BIOBANK_REPORT, payload: biobank},
            {type: SET_LOADING, payload: false}
          ]
        }

        utils.testAction(actions.__GET_BIOBANK_REPORT__, options, done)
      })

      it('should return biobank from state if it is already there', done => {
        const state = {
          allBiobanks: [
            {id: 'biobank'}
          ]
        }

        const options = {
          state,
          payload: 'biobank',
          expectedMutations: [
            {type: SET_BIOBANK_REPORT, payload: {id: 'biobank'}}
          ]
        }

        utils.testAction(actions.__GET_BIOBANK_REPORT__, options, done)
      })
    })
    describe('GET_COLLECTION_REPORT', () => {
      it('should retrieve a single collection entity from the server based on a collection id and store it in the state', done => {
        const response = {
          _meta: {
            name: 'meta'
          },
          id: '001',
          name: 'beautiful collection',
          description: 'beautiful samples'
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_collections/001?attrs=*,diagnosis_available(label),biobank(id,name,juridical_person,country,url,contact),contact(email,phone),sub_collections(name,id,sub_collections(*),parent_collection,order_of_magnitude,materials,data_categories)')).thenResolve(response)
        td.replace(api, 'get', get)

        const options = {
          payload: '001',
          expectedMutations: [
            {type: SET_LOADING, payload: true},
            {type: SET_COLLECTION_REPORT, payload: response},
            {type: SET_LOADING, payload: false}
          ]
        }
        utils.testAction(actions.__GET_COLLECTION_REPORT__, options, done)
      })
    })

    describe('GET_NETWORK_REPORT', () => {
      const neverReturningPromise = new Promise(() => {})
      const collectionCall = '/api/v2/eu_bbmri_eric_collections?q=network==001&num=10000&attrs=*,diagnosis_available(label),biobank(id,name,juridical_person,country,url,contact),contact(email,phone),sub_collections(name,id,sub_collections(*),parent_collection,order_of_magnitude,materials,data_categories)'
      it('should set error', done => {
        const collectionError = new Error('No way!')
        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_networks/001')).thenReturn(neverReturningPromise)
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?q=network==001&num=10000')).thenReturn(neverReturningPromise)
        td.when(get(collectionCall)).thenReject(collectionError)
        td.replace(api, 'get', get)
        const options = {
          payload: '001',
          expectedMutations: [
            {type: SET_NETWORK_BIOBANKS, payload: undefined},
            {type: SET_NETWORK_COLLECTIONS, payload: undefined},
            {type: SET_NETWORK_REPORT, payload: undefined},
            {type: SET_LOADING, payload: true},
            {type: SET_ERROR, payload: collectionError}
          ]
        }
        utils.testAction(actions.__GET_NETWORK_REPORT__, options, done)
      })

      it('should load network', done => {
        const network = {
          _meta: {
            name: 'meta'
          },
          id: '001',
          name: 'beautiful network',
          description: 'beautiful data'
        }
        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_networks/001')).thenResolve(network)

        td.when(get('/api/v2/eu_bbmri_eric_biobanks?q=network==001&num=10000')).thenReturn(neverReturningPromise)
        td.when(get(collectionCall)).thenReturn(neverReturningPromise)
        td.replace(api, 'get', get)
        const options = {
          payload: '001',
          expectedMutations: [
            {type: SET_NETWORK_BIOBANKS, payload: undefined},
            {type: SET_NETWORK_COLLECTIONS, payload: undefined},
            {type: SET_NETWORK_REPORT, payload: undefined},
            {type: SET_LOADING, payload: true},
            {type: SET_NETWORK_REPORT, payload: network},
            {type: SET_LOADING, payload: false}
          ]
        }
        utils.testAction(actions.__GET_NETWORK_REPORT__, options, done)
      })

      it('should retrieve the collections and biobanks of a network from the server based on a network id and store them in the state', done => {
        const get = td.function('api.get')
        const networkPromise = new Promise(() => {})
        td.when(get('/api/v2/eu_bbmri_eric_networks/001')).thenReturn(networkPromise)
        td.when(get('/api/v2/eu_bbmri_eric_biobanks?q=network==001&num=10000')).thenResolve([{id: 'bb-1'}])
        td.when(get(collectionCall)).thenResolve([{id: 'col-1'}])
        td.replace(api, 'get', get)
        const options = {
          payload: '001',
          expectedMutations: [
            {type: SET_NETWORK_BIOBANKS, payload: undefined},
            {type: SET_NETWORK_COLLECTIONS, payload: undefined},
            {type: SET_NETWORK_REPORT, payload: undefined},
            {type: SET_LOADING, payload: true},
            {type: SET_NETWORK_COLLECTIONS, payload: [{id: 'col-1'}]},
            {type: SET_NETWORK_BIOBANKS, payload: [{id: 'bb-1'}]}
          ]
        }
        utils.testAction(actions.__GET_NETWORK_REPORT__, options, done)
      })
    })

    describe('GET_BIOBANK_QUALITY_BIOBANKS', () => {
      it('should retrieve the biobanks for which certain level of assessment is applied for the quality standards', done => {
        const response = {
          meta: {
            name: 'meta'
          },
          items: [
            {id: 'random-1', biobank: 'col-1', quality_standard: '1', asses_level_bio: 'eric'}
          ]
        }

        const state = {
          route: {
            query: {
              biobank_quality: 'eric'
            }
          }
        }

        const get = td.function('api.get')
        td.when(get('/api/v2/eu_bbmri_eric_bio_qual_info?q=assess_level_bio=in=(eric)')).thenResolve(response)
        td.replace(api, 'get', get)
        const options = {
          state: state,
          expectedMutations: [
            {type: SET_BIOBANK_QUALITY_BIOBANKS, payload: response.items}
          ]
        }

        utils.testAction(actions.__GET_BIOBANK_QUALITY_BIOBANKS__, options, done)
      })

      it('should pass empty array to mutation when no quality standards are selected', (done) => {
        const state = {
          route: {
            query: {}
          }
        }

        const options = {
          state: state,
          expectedMutations: [
            {type: SET_BIOBANK_QUALITY_BIOBANKS, payload: []}
          ]
        }

        utils.testAction(actions.__GET_BIOBANK_QUALITY_BIOBANKS__, options, done)
      })
    })
  })
})
