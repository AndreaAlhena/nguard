<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Alpha Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validate that an attribute contains only <strong>Unicode alphabetic characters (matched by \p&lcub;L&rcub; and \p&lcub;M&rcub;)</strong>.
    If the <strong>hasAsciiOnly</strong> flag is set to <strong>true</strong>, the validation is restricted by characters in the <strong>ASCII range</strong>
    (a-z and A-Z)
</p>
<p>Characters from the extended ASCII table are NOT valid</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (hasAsciiOnly: boolean = false): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Unicode alphabetic characters</h3>
<p>Unicode alphabetic characters (matched by \p&lcub;L&rcub; and \p&lcub;M&rcub;) are allowed</p>
<Code language="typescript">
    new FormControl('', [NguardValidators.String.alpha()]);
</Code>
<h3>ASCII characters</h3>
<p>Providing the <em>hasAsciiOnly flag</em>, the validation is restricted by characters in the ASCII range (a-z and A-Z)</p>
<Code language="typescript">
    new FormControl('', [NguardValidators.String.alpha(true)]);
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>alpha</Badge> error is returned if the attribute doesn't meet the validator requirements.</p>