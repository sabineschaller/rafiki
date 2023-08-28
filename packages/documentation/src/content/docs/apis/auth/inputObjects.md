---
title: Input objects
---

<!-- Do not edit this file, it has been automatically generated by docusaurus-graphql-plugin -->

## FilterGrantState

<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>

<table>
<thead><tr><th>Name</th><th>Description</th></tr></thead>
<tbody>
<tr>
<td>
in<br />
<a href="enums#grantstate"><code>[GrantState!]</code></a>
</td>
<td>

</td>
</tr>
<tr>
<td>
notIn<br />
<a href="enums#grantstate"><code>[GrantState!]</code></a>
</td>
<td>

</td>
</tr>
</tbody>
</table>

## FilterString

<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>

<table>
<thead><tr><th>Name</th><th>Description</th></tr></thead>
<tbody>
<tr>
<td>
in<br />
<a href="scalars#string"><code>[String!]</code></a>
</td>
<td>

</td>
</tr>
</tbody>
</table>

## GrantFilter

<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>

<table>
<thead><tr><th>Name</th><th>Description</th></tr></thead>
<tbody>
<tr>
<td>
identifier<br />
<a href="inputObjects#filterstring"><code>FilterString</code></a>
</td>
<td>

</td>
</tr>
<tr>
<td>
state<br />
<a href="inputObjects#filtergrantstate"><code>FilterGrantState</code></a>
</td>
<td>

</td>
</tr>
</tbody>
</table>

## RevokeGrantInput

<p style={{ marginBottom: "0.4em" }}><strong>Arguments</strong></p>

<table>
<thead><tr><th>Name</th><th>Description</th></tr></thead>
<tbody>
<tr>
<td>
grantId<br />
<a href="scalars#string"><code>String!</code></a>
</td>
<td>

</td>
</tr>
</tbody>
</table>