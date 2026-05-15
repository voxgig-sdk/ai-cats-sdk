<?php
declare(strict_types=1);

// AiCats SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AiCatsUtility::setRegistrar(function (AiCatsUtility $u): void {
    $u->clean = [AiCatsClean::class, 'call'];
    $u->done = [AiCatsDone::class, 'call'];
    $u->make_error = [AiCatsMakeError::class, 'call'];
    $u->feature_add = [AiCatsFeatureAdd::class, 'call'];
    $u->feature_hook = [AiCatsFeatureHook::class, 'call'];
    $u->feature_init = [AiCatsFeatureInit::class, 'call'];
    $u->fetcher = [AiCatsFetcher::class, 'call'];
    $u->make_fetch_def = [AiCatsMakeFetchDef::class, 'call'];
    $u->make_context = [AiCatsMakeContext::class, 'call'];
    $u->make_options = [AiCatsMakeOptions::class, 'call'];
    $u->make_request = [AiCatsMakeRequest::class, 'call'];
    $u->make_response = [AiCatsMakeResponse::class, 'call'];
    $u->make_result = [AiCatsMakeResult::class, 'call'];
    $u->make_point = [AiCatsMakePoint::class, 'call'];
    $u->make_spec = [AiCatsMakeSpec::class, 'call'];
    $u->make_url = [AiCatsMakeUrl::class, 'call'];
    $u->param = [AiCatsParam::class, 'call'];
    $u->prepare_auth = [AiCatsPrepareAuth::class, 'call'];
    $u->prepare_body = [AiCatsPrepareBody::class, 'call'];
    $u->prepare_headers = [AiCatsPrepareHeaders::class, 'call'];
    $u->prepare_method = [AiCatsPrepareMethod::class, 'call'];
    $u->prepare_params = [AiCatsPrepareParams::class, 'call'];
    $u->prepare_path = [AiCatsPreparePath::class, 'call'];
    $u->prepare_query = [AiCatsPrepareQuery::class, 'call'];
    $u->result_basic = [AiCatsResultBasic::class, 'call'];
    $u->result_body = [AiCatsResultBody::class, 'call'];
    $u->result_headers = [AiCatsResultHeaders::class, 'call'];
    $u->transform_request = [AiCatsTransformRequest::class, 'call'];
    $u->transform_response = [AiCatsTransformResponse::class, 'call'];
});
