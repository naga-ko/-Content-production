uniform float uFrequency;
uniform float uTime; //追加
uniform float uPositionx;
uniform float uPositiony;

void main()
{
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency + uTime) * 0.1; //変更
    modelPosition.x += uPositionx;
    modelPosition.y += uPositiony;
  gl_Position = projectionMatrix * viewMatrix * modelPosition;
}