action$
    .do((action)=> console.log(action));
// do will perform an action with generating more elements
action$
    .do((action)=> console.log(action))
    .ignoreElements();
//stops searching for action output stream and prevents going into infinite
// loop.

// filter will filter with specific type
action$.filter(action => (action === "ANC"))
    .do(action => {
        console.log(action)
    })

// Instead of above we can use ofType which uses filter behind the scenes.
action$.ofType("ANC")
    .do((action)=> console.log(action))

// Return observable of action ABC 1000 seconds after running action of type “ABC”.
action$
    .ofType("ANC")
    .switchMap(() => {
        return Observable.of("ABC")
            .delay(1000);
    })

//adding Redux Devtool in the app.

composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

action$
    .ofType("FETCH_USER")
    .switchMap(({payLoad}) => {
        return Observable.ajax.getJSON(URL + payload)
            .map(response => {
            });
    })
:
Simple
AJAX
call

action$
    .ofType("FETCH_USER")
    .switchMap(({payLoad}) => {
        return Observable.ajax.getJSON(URL)
        //get top 5 ids from the response.
            .map(ids => {
                ids.slice(0, 5)
                //map each id to a unique URL
                    .map(ids => ids.map(id => URL1 + id))
                    //get a list of observables to be subscribed
                    .map(urls =>urls.map(url => Observable.ajax.get(url)))
                    //executes the ajax call and appends results synchronously
                    .mergeMap(reqs => Observable.forkJoin(reqs))
                    //results dispatch to store
                    .map(results => receiveUsers(results))
            });
    })
// multiple requests.


action$
    .ofType("FETCH_USER”)
        .debounceTime(500)
        .switchMap(({payLoad}) => {
            return Observable.ajax.getJSON(URL + payload)
                .map(response => {
                });
        })
// Applying debounce before request is fired.

action$
    .ofType("FETCH_USER")
    .debounceTime(500)
    .switchMap(({payLoad}) => {
        return Observable.ajax.getJSON(URL + payload)
            .map(response => {
                if (x) {
                    Observable.throw(new Error("error"));
                }
            })
            .map(results)
            .catch(error => {
                return Observable.of(actionError(error));
            });

    }) // handeling error

action$
    .ofType("FETCH_bear")
    .debounceTime(500)
    .filter(action => action.payload !== "")
    .switchMap(({payLoad}) => {
        const loading = Observable.of(searchBearsLoading(true));
        const request = Observable.ajax.getJSON(url)
            .map(receiveBeers)
            .catch(error => {
                Observable.of(searchBeerErr(error));
            })

        //runs 2 observables synchronously one after the other.
        return Observable.concat(
            loading,
            request
        )
    });


action$
    .ofType("FETCH_bear")
    .debounceTime(500)
    .filter(action => action.payload !== "")
    .switchMap(({payLoad}) => {
        const loading = Observable.of(searchBearsLoading(true));
        const request = Observable.ajax.getJSON(url)
            .takeUntil(action$.ofType(CANCEL))
            .map(receiveBeers)
            .catch(error => {
                Observable.of(searchBeerErr(error));
            })

        return Observable.concat(
            loading,
            request
        )
    }); // Take until will cancel subscription.

import {ActionsObservable} from "redux-observable";
it("should return correct actions", function () {
    const action$ = ActionsObservable.of({
        type: "FETCH_USER",
        payload: "abc"
    })
    const output$ = fetchUserEpic(action$);
    output$.subscribe(action => {
        console.log(action);
    })
    output.toArray().subscribe(actions => {
        expect(actions.length).toBe(1);
    })
}) // unit testing simple epics of redux observables.
