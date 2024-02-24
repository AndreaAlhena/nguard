<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>URL Validator</h1>
<hr class="my-0">
<p>The field under validation must be a valid URL as...</p>
<ul>
    <li>http://www.domain.com</li>
    <li>https://www.domain.com</li>
    <li>www.domain.com</li>
    <li>domain.com</li>
</ul>
<p>Query arguments and more complex paths are valid</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (): ValidatorErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.String.url]);
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>url</Badge> error is returned if the attribute doesn't meet the validator requirements.
</p>