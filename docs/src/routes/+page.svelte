<script lang="ts">
    import Code from '../components/Code.svelte';
</script>

<div class="row">
    <div class="col-md-12">
        <div class="d-md-flex align-items-center justify-content-center mb-3 mx-2">
            <div class="mb-md-0 mb-3 text-center">
                <img id="homepage-logo" src="/assets/img/logos/nguard.png" alt="nguard logo">
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="d-md-flex align-items-center mb-3 mx-2">
            <div class="mb-md-0 mb-3">
                <h1 class="font-weight-bold mb-0">nGuard Docs</h1>
                <p class="mb-0">A comprehensive set of Validators for Angular</p>
            </div>
        </div>
        <hr class="my-0">
        <div class="d-md-flex align-items-center mt-4 mb-3 mx-2">
            <div class="mb-md-0 mb-3">
                <p>NGUARD is a comprehensive set of <strong>Validators for Angular</strong>, to be used both with Template and Reactive Driven Forms</p>
                <p>Is available as an Angular Library via npm:</p>
                <Code language={'bash'}>
                    // with npm
                    npm install nguard
                    // or with yarn
                    yarn add nguard
                </Code>
            </div>
        </div>
    </div>
</div>