<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Required If Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>RequiredIf validator</em>. For details about the <em>RequiredIf validator</em> <a href="/validators/multi/required-if">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    string | IRequiredIfConfig

    interface IRequiredIfConfig &lcub;
        fieldKey: string;
        isStrict?: boolean;
        value?: primitive;
    &rcub;
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<h3>Providing the field key as a string</h3>
<Code language="html">
    //
    &lt;input name="fieldA" nguardRequiredIf="fieldB" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldB" [ngModel]="componentPropB"&gt;
</Code>

<h3>Providing the field key and a value</h3>
<p>In the provided example, <em>fieldA</em> is required only if <em>fieldB</em> has the value 'something'</p>
<Code language="html">
    //
    &lt;input name="fieldA" [nguardRequiredIf]="&lcub;fieldKey: 'fieldB', value: 'something'&rcub;" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldB" [ngModel]="componentPropB"&gt;
</Code>

<h3>Providing the field key and a value, enforcing a strict type check</h3>
<p>In the provided example, <em>fieldA</em> is required only if <em>fieldB</em> has the value 1 and it's type is <em>number</em></p>
<Code language="html">
    //
    &lt;input name="fieldA" [nguardRequiredIf]="&lcub;fieldKey: 'fieldB', isStrict: true, value: 1&rcub;" [ngModel]="componentPropA"&gt;
    &lt;input name="fieldB" [ngModel]="componentPropB"&gt;
</Code>

<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>requiredIf</Badge> error is returned if the attribute is not set and has been marked as required</p>