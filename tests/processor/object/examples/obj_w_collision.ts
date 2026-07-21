interface Enemy extends GMObject {}
interface Pickup extends GMObject {}

class CollisionObject extends GMObject {
  hitCount = 0;

  override onCreate() {
    this.hitCount = 0;
  }

  override onCollision_obj_enemy(other: Enemy) {
    instance_destroy();
  }

  override onCollision_obj_pickup(other: Pickup) {
    super.onCollision_obj_pickup(other);
    this.hitCount += 1;
  }
}
