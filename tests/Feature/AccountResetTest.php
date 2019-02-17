<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AccountResetTest extends TestCase
{
	/** @test */
	public function user_can_send_account_reset_link()
	{ 
	    $user = factory(User::class)->create();

	    $response = $this->get('/password/reset');
	    $response->assertOk();
	}
}
