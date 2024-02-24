<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>AlphaNum Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validate that an attribute contains only <strong>Unicode alphanumeric characters (matched by \p&lcub;L&rcub; \p&lcub;M&rcub; and \p&lcub;N&rcub;)</strong>
    If the <strong>hasAsciiOnly</strong> flag is set to <strong>true</strong>, the validation is restricted by characters in the ASCII range
    (a-z, A-Z and 0-9)
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (hasAsciiOnly: boolean = false): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Unicode alphanumeric characters</h3>
<p>Unicode alphanumeric characters (matched by \p&lcub;L&rcub; \p&lcub;M&rcub; and \p&lcub;N&rcub;), dash and underscores</p>
<Code language="typescript">
    new FormControl('', [NguardValidators.String.alphaNum()]);
</Code>
<h3>ASCII characters</h3>
<p>Providing the <em>hasAsciiOnly flag</em>, the validation is restricted by characters in the ASCII range (a-z, A-Z and 0-9), dashes and underscores</p>
<Code language="typescript">
    new FormControl('', [NguardValidators.String.alphaNum(true)]);
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>alphaNum</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>