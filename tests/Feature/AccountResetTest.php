<?php

namespace Tests\Feature;

use App\Notifications\ResetPasswordNotification;
use App\PasswordReset;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class AccountResetTest extends TestCase
{
	use DatabaseTransactions;
	
	/** @test */
	public function user_can_send_account_reset_link()
	{ 
		Notification::fake();
	    $user = factory(User::class)->create();

	    $response = $this->post('/password/email', [ 'email' => $user->email ]);
	    $response->assertStatus(302);

	    Notification::assertSentTo(
            [ $user ],
            ResetPasswordNotification::class
        );
	}

	/** @test */
	// public function can_validate_access_token()
	// { 
	// 	$user = factory(User::class)->create();
	// 	$token = \crypt('11111111111111', '222222222222');
	// 	$dbToken = \hash('sha256', $token);

	// 	$reset = factory(PasswordReset::class)->create([
	// 		'email' => $user->email,
	// 		'token' => $dbToken
	// 	]);

	// 	$response = $this->post("/api/check-token/$token/$user->email");
	// 	$response->assertOk();

	// 	$this->assertTrue($response->json('valid'));
	// }
}
