<div widget-area="hp-header">
	<!-- BEGIN widgets.hp-header -->
	{{widgets.hp-header.html}}
	<!-- END widgets.hp-header -->
</div>

<div class="row">
	<div class="<!-- IF widgets.hp-sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.hp-sidebar.length -->">
		<div widget-area="hp-content">
			<!-- BEGIN widgets.hp-content -->
			{{widgets.hp-content.html}}
			<!-- END widgets.hp-content -->
		</div>
	</div>
	<div widget-area="hp-sidebar" class="col-md-3 col-xs-12 <!-- IF !widgets.hp-sidebar.length -->hidden<!-- ENDIF !widgets.hp-sidebar.length -->">
		<!-- BEGIN widgets.hp-sidebar -->
		{widgets.hp-sidebar.html}
		<!-- END widgets.hp-sidebar -->
	</div>
</div>

<div widget-area="hp-footer">
	<!-- BEGIN widgets.hp-footer -->
	{widgets.hp-footer.html}
	<!-- END widgets.hp-footer -->
</div>
