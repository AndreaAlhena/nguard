<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>ASCII Validator</h1>
<hr class="my-0">
<p>Validate that an attribute contains only ASCII characters from the standard table:</p>
<ul>
    <li>Horizontal tab</li>
    <li>Line Feed</li>
    <li>Carriage Return</li>
    <li>Chars included from space to ~</li>
</ul>
<p>Characters from the extended ASCII table are NOT valid</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (): ValidatorErrors | null
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    new FormControl('', [NguardValidators.String.ascii]);
</Code>
<h2 ckass="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>ascii</Badge> error is returned if the attribute doesn't meet the validator requirements.
</p>