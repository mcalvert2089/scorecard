<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PositionsTest extends TestCase
{
	use DatabaseTransactions;

	/** @test */
	public function a_user_can_retrieve_all_positions() {
		$user = $this->getUser();

		$response = $this->actingAs($user, 'api')
						 ->get('/api/positions');
		$response->assertOk();

		$this->assertCount(12, $response->json());
	}
}