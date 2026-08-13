# AiCats SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AiCatsUtility.registrar = ->(u) {
  u.clean = AiCatsUtilities::Clean
  u.done = AiCatsUtilities::Done
  u.make_error = AiCatsUtilities::MakeError
  u.feature_add = AiCatsUtilities::FeatureAdd
  u.feature_hook = AiCatsUtilities::FeatureHook
  u.feature_init = AiCatsUtilities::FeatureInit
  u.fetcher = AiCatsUtilities::Fetcher
  u.make_fetch_def = AiCatsUtilities::MakeFetchDef
  u.make_context = AiCatsUtilities::MakeContext
  u.make_options = AiCatsUtilities::MakeOptions
  u.make_request = AiCatsUtilities::MakeRequest
  u.make_response = AiCatsUtilities::MakeResponse
  u.make_result = AiCatsUtilities::MakeResult
  u.make_point = AiCatsUtilities::MakePoint
  u.make_spec = AiCatsUtilities::MakeSpec
  u.make_url = AiCatsUtilities::MakeUrl
  u.param = AiCatsUtilities::Param
  u.prepare_auth = AiCatsUtilities::PrepareAuth
  u.prepare_body = AiCatsUtilities::PrepareBody
  u.prepare_headers = AiCatsUtilities::PrepareHeaders
  u.prepare_method = AiCatsUtilities::PrepareMethod
  u.prepare_params = AiCatsUtilities::PrepareParams
  u.prepare_path = AiCatsUtilities::PreparePath
  u.prepare_query = AiCatsUtilities::PrepareQuery
  u.graphql_body = AiCatsUtilities::GraphqlBody
  u.graphql_errors = AiCatsUtilities::GraphqlErrors
  u.result_basic = AiCatsUtilities::ResultBasic
  u.result_body = AiCatsUtilities::ResultBody
  u.result_headers = AiCatsUtilities::ResultHeaders
  u.transform_request = AiCatsUtilities::TransformRequest
  u.transform_response = AiCatsUtilities::TransformResponse
}
