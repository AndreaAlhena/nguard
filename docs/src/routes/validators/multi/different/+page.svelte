<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Different Validator</h1>
<hr class="mt-0 mb-4">
<p>
    Validate that an attribute is different to another one with the specified compareFieldKey
    The performed check is case sensitive for strings
</p>
<p>Characters from the extended ASCII table are NOT valid</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (compareFieldKey: string, isStrict: boolean = false): ValidatorFn
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>No strict</h3>
<p>By default, comparison is made without taking into account the data type of the fields. In example, 1 and '1' won't be considered different:</p>
<Code language="typescript">
    //
    password: new FormControl(''),
    passwordConfirm: new FormControl('', [NguardValidators.Multi.different('password')])
</Code>
<h3>Strict</h3>
<p>Comparison is made taking into account the data type of the fields. In example, 1 and '1' will be considered different:</p>
<Code language="typescript">
    //
    password: new FormControl(''),
    passwordConfirm: new FormControl('', [NguardValidators.Multi.different('password', true)])
</Code>
<h2 ckass="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>different</Badge> error is returned if the attribute is not different from the given <em>(compareFieldKey)</em> one.</p>