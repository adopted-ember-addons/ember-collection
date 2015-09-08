export default function needsRevalidate(view){
  view._renderNode.isDirty = true;
  view._renderNode.ownerNode.emberView.scheduleRevalidate(view._renderNode, view.toString(), 'rerendering via needsRevalidate');
}
