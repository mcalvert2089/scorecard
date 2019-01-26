<?php
namespace Tests\Unit;

use App\Player;
use App\Position;
use App\Team;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PositionsUnitTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
	public function can_get_all_twelve_positions() {
		$position = new Position;
		$positions = $position->getPositions();
		$this->assertCount(12, $positions);
	}
}