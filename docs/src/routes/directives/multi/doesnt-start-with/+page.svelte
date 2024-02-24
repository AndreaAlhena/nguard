<script>
    import Badge from "../../../../components/Badge.svelte";
    import Code from "../../../../components/Code.svelte";
</script>

<h1>Doesn't Start With Validation Directive</h1>
<hr class="mt-0 mb-4">
<p>
    A validation directive that wraps the <em>DoesntStartWith validator</em>. For details about the <em>DoesntStartWith validator</em> <a href="/validators/multi/doesnt-start-with">click here</a>.
</p>
<h2 class="mt-4">API</h2>
<hr class="mt-0 mb-4">
<Code language="typescript">
    //
    primitive[]
</Code>
<h2 class="mt-4">Usage examples</h2>
<hr class="mt-0 mb-4">
<Code language="html">
    //
    &lt;input name="fieldA" [nguardDoesntStartWith]="['first', 1, 'something']" [ngModel]="componentPropA"&gt;
</Code>
<h2 class="mt-4">Errors</h2>
<hr class="mt-0 mb-4">
<p><Badge>doesntStartWith</Badge> error is returned if the attribute doesn't start with one of the provided values</p>