<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Same Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validate that an attribute is the same as another one with the specified compareFieldKey
    The performed check is case sensitive for strings
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (compareFieldKey: string, isStrict: boolean = false): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>No strict</h3>
<p>By default, comparison is made without taking into account the data type of the fields. In example, 1 and '1' will be considered the same:</p>
<Code language="typescript">
    //
    currentPassword: new FormControl(''),
    newPassword: new FormControl('', [NguardValidators.Multi.same('password')])
</Code>
<h3>Strict</h3>
<p>Comparison is made taking into account the data type of the fields. In example, 1 and '1' will not be considered the same:</p>
<Code language="typescript">
    //
    currentPassword: new FormControl(''),
    newPassword: new FormControl('', [NguardValidators.Multi.different('password', true)])
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>same</Badge> error is returned if the attribute is different from the given one<em>(compareFieldKey)</em> one.</p>