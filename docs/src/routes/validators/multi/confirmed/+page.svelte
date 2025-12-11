<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Confirmed Validator</h1>
<hr class="my-0">
<p>The field under validation must match a field with the specified key. This is commonly used for password confirmation fields.</p>
<p>The comparison uses strict equality (===).</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    (fieldKey: string): ValidatorFn
</Code>

<h2 class="mt-4">Parameters</h2>
<hr class="mt-0 mb-4">
<ul>
    <li><code>fieldKey</code> - The key of the original field to confirm</li>
</ul>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    // Password confirmation
    password: new FormControl(''),
    password_confirmation: new FormControl('', [NguardValidators.Multi.confirmed('password')])
</Code>

<Code language="typescript">
    // Email confirmation
    email: new FormControl(''),
    email_confirmation: new FormControl('', [NguardValidators.Multi.confirmed('email')])
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p>
    <Badge>confirmed</Badge> error is returned if the field does not match the original field's value.
</p>
