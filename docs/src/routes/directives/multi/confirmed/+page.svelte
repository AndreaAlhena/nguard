<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Confirmed Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>confirmed validator</em>. For details about the <em>confirmed validator</em> <a href="/validators/multi/confirmed">click here</a>.
</p>

<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    [nguardConfirmed]="fieldKey"
</Code>

<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    &lt;input name="password" [ngModel]="password"&gt;
    &lt;input name="password_confirmation" [nguardConfirmed]="'password'" [ngModel]="passwordConfirmation"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>confirmed</Badge> error is returned if the value doesn't match the referenced field.</p>
