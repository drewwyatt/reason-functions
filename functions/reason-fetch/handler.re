[%raw "require('isomorphic-fetch')"];

let makeRequest = url =>
  Js.Promise.(
    Fetch.fetch(url)
    |> then_(Fetch.Response.text)
    |> then_(text =>
         AwsLambda.APIGatewayProxy.result(
           ~body=`Plain(text),
           ~statusCode=200,
           (),
         )
         |> resolve
       )
  );

let handler: AwsLambda.APIGatewayProxy.handler =
  (event, _context) => {
    open AwsLambda.APIGatewayProxy;
    let urlParam =
      event->Event.queryStringParametersGet
      |> Js.Nullable.toOption
      |> Js.Option.andThen((. params) => Js.Dict.get(params, "url"));

    let promise =
      switch (urlParam) {
      | Some(url) => url->makeRequest
      | None =>
        Js.Promise.resolve(
          result(~body=`Plain("Please provide a url"), ~statusCode=400, ()),
        )
      };

    promise;
  };